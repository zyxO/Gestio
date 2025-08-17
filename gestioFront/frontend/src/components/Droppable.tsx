import {useDroppable} from '@dnd-kit/core';

function Droppable(props:any) {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
        data: {
            index: props.index,
        },
    });
    const style = {
        "backgroundImage": isOver ? 'linear-gradient(to bottom, rgba(236, 233, 230, 0.3), rgba(255, 255, 255, 0.3))' : undefined,
        "boxShadow":  isOver ? "0 0 12px rgba(0, 255, 164, 0.5)" : undefined,
        cursor: 'grab'
    };
    
    
    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}

export default Droppable;