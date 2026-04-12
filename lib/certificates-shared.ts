export function generateCertificateNumber() {
  const characters = '0123456789ABCDEF';
  let suffix = '';
  for (let i = 0; i < 6; i++) {
    suffix += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `AIVSME${suffix}`;
}

export function formatCertificateDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
