export function isImage(file) {
    return /^image\/\w+$/.test(file.mime)
}

export function isPDF(file) {
    return [
        'application/pdf',
        'application/x-pdf',
        'application/acrobat',
        'application/vnd.pdf',
        'text/pdf',
        'text/x-pdf',
    ].includes(file.mime)
}

export function isAudio(file) {
    return [
        'audio/mpeg',
        'audio/wav',
        'audio/x-m4a',
        'audio/ogg',
        'audio/webm',
    ].includes(file.mime)
}

export function isVideo(file) {
    return [
        'video/mp4',
        'video/ogg',
        'video/mpeg',
        'video/quicktime',
        'video/webm',
    ].includes(file.mime)
}

export function isWord(file) {
    return [
        'application/msword',
        'application/vnd.ms-word.document.macroEnabled.12',
        'application/vnd.ms-word.template.macroEnabled.12',
        'application/vnd.openxmlformats.officedocument.wordprocessingml.document',
    ].includes(file.mime)
}

export function isExcel(file) {
    return [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats.officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel.sheet.macroEnabled.12',
        'application/vnd.ms-excel.template.macroEnabled.12',
    ].includes(file.mime)
}

export function isZip(file) {
    return [
        'application/zip'
    ].includes(file.mime)
}

export function isText(file) {
    return [
        'text/plain',
        'text/csv',
        'text/javascript',
        'text/html',
        'text/css'
    ].includes(file.mime)
}
