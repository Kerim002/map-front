export function formatToDDMMYYYY(isoString: string, time?: boolean): string {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year}${time ? ` ${hour}:${minute}` : ""}`;
}

export function formatDateToYYYYMMDDHHMISS(input: string): string {
  const date = new Date(input);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  const ss = "00"; // since input doesn't include seconds

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}
