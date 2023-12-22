type ScoreCardProps = {
  totalKeystrokes: number,
  correctKeystrokes: number,
  time: number
}

export const ScoreCard = ({totalKeystrokes, correctKeystrokes, time}: ScoreCardProps) => {
  const cpm = correctKeystrokes / (time / 60)
  const wpm = Math.round(cpm / 5)
  const accuracy = Math.round(correctKeystrokes / totalKeystrokes * 100)

  return (
    <section className="rounded-md p-4 border-2">
      Your score
      <div>
        <span>{wpm}</span> WPM
      </div>
      <div>
        <span>{accuracy}%</span> accuracy
      </div>
    </section>
  )
}