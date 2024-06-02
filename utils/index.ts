export function getFilePreviewFromEvent(ev: Event) {
    if (ev.target) {
        const inputEl = ev.target as HTMLInputElement
        if (inputEl.files && inputEl.files.length > 0) {
            return URL.createObjectURL(inputEl.files[0]);
        }
    }
    return '';
}

export function getUserReadableDate(date: number | Date) {
    return Intl.DateTimeFormat('pt-BR', {
        timeStyle: 'medium',
        dateStyle: 'long'
    }).format(date);
}

export function getMissingFields<ToOmit extends string>(requiredObj: Omit<object, ToOmit>, providedObj: object) {
    const requiredFields = Reflect.ownKeys(requiredObj);
    const keyArray = (providedObj instanceof FormData) ? Array.from(providedObj.keys()) : Reflect.ownKeys(providedObj); 
 
    return keyArray.reduce<Array<string>>((acc, field) => {
        if (!requiredFields.includes(field) && typeof field === "string") {
            acc.push(field)
            return acc;
        }
        return acc;
    }, [])
}
