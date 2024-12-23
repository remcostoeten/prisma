export default function DarkPreview() {
  return (
    <div className="relative aspect-video w-full bg-[#0f0f0f] p-2">
      <div className="absolute left-0 right-0 top-0 flex h-6 items-center bg-[#171717] px-2">
        <div className="h-2 w-2 rounded-full bg-[#3ecf8e]" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-2 w-16 rounded bg-[#3ecf8e]" />
        <div className="h-2 w-24 rounded bg-[#b4b4b4]" />
        <div className="h-2 w-20 rounded bg-[#b4b4b4]" />
      </div>
    </div>
  )
}
