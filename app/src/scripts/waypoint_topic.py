import rclpy
from rclpy.node import Node
from rclpy.action import ActionClient
from nav2_msgs.action import NavigateToPose
from geometry_msgs.msg import PoseStamped
from std_msgs.msg import String  # Import the message type for publishing feedback
import json
from action_msgs.msg import GoalStatus
import time

class WaypointNavigator(Node):
    def __init__(self):
        super().__init__('waypoint_navigator')
        self.action_client = ActionClient(self, NavigateToPose, 'navigate_to_pose')
        self.filename = 'waypoints.json'
        self.waypoints = self.load_waypoints()
        self.current_waypoint_index = 0

        # Create a publisher for the feedback topic
        self.feedback_publisher = self.create_publisher(String, 'navigation_feedback', 10)

    def load_waypoints(self):
        try:
            with open(self.filename, 'r') as file:
                waypoints = json.load(file)
            return waypoints
        except FileNotFoundError:
            self.get_logger().info(f"File {self.filename} not found.")
            return []
        except json.JSONDecodeError:
            self.get_logger().info(f"File {self.filename} is not in correct JSON format.")
            return []

    def send_next_waypoint(self):
        if self.current_waypoint_index < len(self.waypoints):
            waypoint = self.waypoints[self.current_waypoint_index]
            goal_msg = NavigateToPose.Goal()
            goal_msg.pose.pose.position.x = waypoint['position']['x']
            goal_msg.pose.pose.position.y = waypoint['position']['y']
            goal_msg.pose.pose.position.z = waypoint['position']['z']
            goal_msg.pose.pose.orientation.x = waypoint['orientation']['x']
            goal_msg.pose.pose.orientation.y = waypoint['orientation']['y']
            goal_msg.pose.pose.orientation.z = waypoint['orientation']['z']
            goal_msg.pose.pose.orientation.w = waypoint['orientation']['w']

            goal_msg.pose.header.frame_id = "map"
            goal_msg.pose.header.stamp = self.get_clock().now().to_msg()

            self.action_client.wait_for_server()
            self.get_logger().info(f"Sending waypoint {self.current_waypoint_index + 1} to the action server.")
            self.send_goal_future = self.action_client.send_goal_async(goal_msg, feedback_callback=self.feedback_callback)
            self.send_goal_future.add_done_callback(self.goal_response_callback)
        else:
            self.get_logger().info("All waypoints have been processed.")
            self.destroy_node()

    def goal_response_callback(self, future):
        goal_handle = future.result()
        if not goal_handle.accepted:
            self.get_logger().info('Goal rejected :(')
            return
        self.get_logger().info('Goal accepted :)')
        self._get_result_future = goal_handle.get_result_async()
        self._get_result_future.add_done_callback(self.get_result_callback)

    def get_result_callback(self, future):
        result = future.result().result
        if future.result().status == GoalStatus.STATUS_SUCCEEDED:
            self.get_logger().info(f'Goal {self.current_waypoint_index + 1} successfully reached.')
            self.current_waypoint_index += 1
            self.send_next_waypoint()
        else:
            self.get_logger().info(f'Goal {self.current_waypoint_index + 1} failed with status {future.result().status}.')
            self.current_waypoint_index += 1
            self.send_next_waypoint()

    def feedback_callback(self, feedback_msg):
        feedback = feedback_msg.feedback


        print("--------------")
        print(feedback)
        print("--------------")



        feedback_data = {
            "Recoveries" : feedback.number_of_recoveries,
            "ETA_sec": feedback.estimated_time_remaining.sec,
            "Distance_remaining_m": feedback.distance_remaining,
            "Time_taken_sec": feedback.navigation_time.sec
        }
        feedback_str = json.dumps(feedback_data)
        self.get_logger().info(feedback_str)

        # Publish the feedback
        feedback_msg = String()
        feedback_msg.data = feedback_str
        time.sleep(1)
        self.feedback_publisher.publish(feedback_msg)

def main(args=None):
    rclpy.init(args=args)
    navigator = WaypointNavigator()
    navigator.send_next_waypoint()
    rclpy.spin(navigator)
    rclpy.shutdown()

if __name__ == '__main__':
    main()
