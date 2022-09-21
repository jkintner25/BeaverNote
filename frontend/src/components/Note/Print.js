import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import NotePanel from './NotePanel';
import './Note.css'

const PrintNote = () => {
    const componentRef = React.useRef(null);

    const onBeforeGetContentResolve = React.useRef(null);

    const [loading, setLoading] = React.useState(false);
    const [text, setText] = React.useState("old boring text");

    const handleAfterPrint = React.useCallback(() => {
    }, []);

    const handleBeforePrint = React.useCallback(() => {
    }, []);

    const handleOnBeforeGetContent = React.useCallback(() => {
        setLoading(true);
        setText("Loading new text...");

        return new Promise((resolve) => {
            onBeforeGetContentResolve.current = resolve;

            setTimeout(() => {
                setLoading(false);
                setText("New, Updated Text!");
                resolve();
            }, 2000);
        });
    }, [setLoading, setText]);

    React.useEffect(() => {
        if (
            text === "New, Updated Text!" &&
            typeof onBeforeGetContentResolve.current === "function"
        ) {
            onBeforeGetContentResolve.current();
        }
    }, [onBeforeGetContentResolve.current, text]);

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);

    const reactToPrintTrigger = React.useCallback(() => {
        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
        // to the root node of the returned component as it will be overwritten.

        // Bad: the `onClick` here will be overwritten by `react-to-print`
        // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

        // Good
        return (
            <button className='print'>
                Print
            </button>
        ); // eslint-disable-line max-len
    }, []);

    return (
        <>
            <NotePanel ref={componentRef} text={text} />
            <ReactToPrint
                content={reactToPrintContent}
                documentTitle="AwesomeFileName"
                onAfterPrint={handleAfterPrint}
                onBeforeGetContent={handleOnBeforeGetContent}
                onBeforePrint={handleBeforePrint}
                removeAfterPrint
                trigger={reactToPrintTrigger}
            />
            {loading && <p className="indicator">Loading...</p>}
        </>
    );
};

export default PrintNote;
