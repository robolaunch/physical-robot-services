export default function logger(log: string) {
  console.log(
    `[${new Date(Date.now())
      .toLocaleString(`en-US`, {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // 24 saat formatında göster
      })
      .replace(`, `, " ")}] ${log}`
  );
}
