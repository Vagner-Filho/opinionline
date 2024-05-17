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
