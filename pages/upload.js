import {Widget} from "@uploadcare/react-widget";
import Link from "next/link";

export default function upload() {
    const copyToClipboard = (data) => {
        navigator.clipboard.writeText(data.cdnUrl);
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
                                file.done(info => copyToClipboard(info))
                            }
                        }}/>

                <ol className="pt-24 pb-4">
                    <li>1. Foto aufnehmen oder hochladen</li>
                    <li>2. CDN Link wird automatisch in Zwischenablage kopiert</li>
                    <li>3. Zu Notion wechseln und einfügen als Embedded Image</li>
                </ol>
                <Link href="/"><a className="mt-4">← Zurück zur Übersicht</a></Link>
            </div>
        </div>
    );
}