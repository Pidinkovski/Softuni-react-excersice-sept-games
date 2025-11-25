export default function objectIdTranform (object) {
    const dataArray = Object.entries(object).map(([id, game ]) => ({
                id,
                ...game
            }))
    return dataArray
}