import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import grab from '../assets/grab.png';
interface DraggableProps {
    id: string;
    children: React.ReactNode;
}
function Draggable({id,children}: Readonly<DraggableProps>) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id
    });
    const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    cursor:`url(${grab}), grabbing`
    } : undefined;


    return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {children}
    </div>
    );
}
export default Draggable;