export default function Arrow({ size = 14 }: { size?: number }) {
  return <span aria-hidden style={{ fontSize: size }}>→</span>;
}
