import {Widget} from "@uploadcare/react-widget";
import Link from "next/link";
import React, {useState} from 'react';

export default function upload() {
    const [cdnLink, setCdnLink] = useState('');

    const copyToClipboard = () => {
        navigator.clipboard.writeText(cdnLink);
    }

    return (
        <div className="flex h-screen">
            <div className="m-auto p-4">
                <label htmlFor='file'>Foto hochladen:</label>{' '}
                <Widget publicKey='5c6862917c5af82b8021'
                        id='file'
                        onFileSelect={(file) => {
                            if (file) {
                                file.progress(info => console.log('File progress: ', info.progress))
                                file.done(info => setCdnLink(info.cdnUrl))
                            }
                        }}/>

                <ol className="pt-24 pb-24 space-y-6">
                    <li>1. Foto aufnehmen oder hochladen</li>
                    <li>{`2. CDN Link kopieren: ${cdnLink && cdnLink + '-/quality/smart_retina/'}`}</li>
                    <li>3. Zu Notion wechseln und einfügen als Embedded Image</li>
                </ol>
                <Link href="/" className="block py-8 font-bold text-black">← Zurück zur Übersicht</Link>
            </div>
        </div>
    );
}