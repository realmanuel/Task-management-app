type Props = {
    priority: "low" | "medium" | "high"
}

export default function PriorityTag({ priority }: Props){
    const colors = {
        low: "bg-green-200",
        medium: "bg-yellow-200",
        high: "bg-red-300",
    }

    return(
        <span className={`text-xs px-2 py-1 rounded ${colors[priority]}`}>
            {priority}
        </span>
    )
}