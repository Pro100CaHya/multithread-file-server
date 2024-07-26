import http from 'k6/http';
import { sleep } from 'k6';

const textFile = open("./text-file.txt");

export const options = {
    stages: [
        {
            duration: '10s',
            target: 500
        },
        {
            duration: '30s',
            target: 1000
        },
        {
            duration: '10s',
            target: 0
        }
    ]
}

export default function () {
    const formData = {
        file: http.file(textFile, "text-file.txt", "text/plain")
    };

    http.post('http://localhost:3000/api/files/upload', formData);
    sleep(1);
}