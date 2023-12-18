export const calculateTotalAmount = (amount: number, currencyValue: number): number => {
    const result: number = amount * currencyValue
    return parseFloat(result.toFixed(2))
}

export const destructureDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return { day, month, year };
}