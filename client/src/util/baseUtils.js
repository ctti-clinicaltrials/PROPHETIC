import moment from 'moment';

export function timeConversion(millisec) {
    let seconds = (millisec / 1000).toFixed(0);
    let minutes = (millisec / (1000 * 60)).toFixed(1);
    let hours = (millisec / (1000 * 60 * 60)).toFixed(1);
    let days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return `${seconds} seconds`;
    else if (minutes < 60) return `${minutes} minutes`;
    else if (hours < 24) return `${hours} hours`;
    else return  `${days} days`
}

export function bytesToSize(bytes){
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return ( bytes / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
}

export function generateUniqueKey() {
    let i, random;
    let uuid = '';
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += '-';
        }
        uuid += (i === 12 ? 4 : (i === 16 ? (random & (3 | 8)) : random)).toString(16);
    }
    return uuid;
}

export function formatDate(date) {
    if(date !== null) {
        date = moment(date).format("MMMM Do, YYYY")
    } else {
        date = '';
    }
    return date;
}

export function formatLongDate(date) {
    if(date !== null) {
        date = moment(date).format("LLL")
    } else {
        date = '';

    }
    return date;
}