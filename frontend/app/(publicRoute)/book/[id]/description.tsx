"use client"
import { useState, memo } from 'react';

export const Description = memo(function Description({ description }: { description: string }) {
    const [showDescription, setShowDescription] = useState(false)

    const renderDescription = () => {
        if (showDescription) {
            return `${description.slice(100)}...`
        } else {
            return description
        }
    }

    return (
        <div>
            <div className=''>{renderDescription()}</div>
            {showDescription && <button onClick={(prev) => setShowDescription(!prev)}>SHOW {showDescription ? 'LESS' : 'MORE'}</button>}
        </div>
    );
})