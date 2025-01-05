import { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";
import { useCV } from "../../CVContext";

const DragBlocks = ({ items, main, onReorder }) => {
  const { editable } = useCV();

  const [isDragging, setIsDragging] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      onReorder((prevItems) => arrayMove(prevItems, oldIndex, newIndex));
    }
    setIsDragging(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const content = (
    <Content $shadow={isDragging && main}>
      {items.map((item) => (
        <SortableItem
          editable={editable}
          key={item.id}
          id={item.id}
          height={item.height}
          scaleFactor={getScaleFactor()} // ! Pass the scale factor here
        >
          {item.content}
        </SortableItem>
      ))}
    </Content>
  );

  return (
    <>
      {editable ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {content}
          </SortableContext>
        </DndContext>
      ) : (
        <>{content}</>
      )}
    </>
  );
};

const SortableItem = ({ id, height, children, editable, scaleFactor = 1 }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  // Adjust the transform values based on the scale factor
  const adjustedTransform = transform
    ? {
        ...transform,
        x: transform.x / scaleFactor,
        y: transform.y / scaleFactor,
      }
    : null;

  const style = {
    transform: CSS.Transform.toString(
      adjustedTransform ? { ...adjustedTransform, scaleY: 1 } : null
    ),
    transition,
    height: `${height}px`,
    zIndex: isDragging ? 2 : 1,
    ...(isDragging ? { boxShadow: "0 4px 8px rgba(0,0,0,0.2)" } : {}),
  };

  return (
    <ItemRoot
      $editable={editable}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div
        onPointerDown={(e) => {
          if (e.target.tagName === "BUTTON") e.stopPropagation();
        }}
      >
        {children}
      </div>
    </ItemRoot>
  );
};

export default DragBlocks;

const ItemRoot = styled.div`
  position: relative;
  /* margin-bottom: 10px; */
  /* background-color: white; */
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  touch-action: none;
  cursor: ${({ $editable }) => ($editable ? "grab" : "auto")};
  &:hover {
    background: ${({ $editable }) =>
      $editable ? "rgba(0, 0, 0, 0.05)" : "none"};
  }
`;

const Content = styled.div`
  box-shadow: ${({ $shadow }) =>
    $shadow ? "0 4px 8px rgba(0,0,0,0.2)" : "none"};
`;

const getScaleFactor = () => {
  const element = document.querySelector("#cv-ctn");
  if (!element) return 1;

  const computedStyle = window.getComputedStyle(element);

  // Extract the `transform` property
  const transform = computedStyle.transform;

  let scale = 1; // Default scale value if no transform is applied

  if (transform && transform !== "none") {
    // Check if it's a scale transform (e.g., "matrix(a, b, c, d, tx, ty)")
    const matrix = transform.match(/matrix\(([^)]+)\)/);
    if (matrix) {
      const values = matrix[1].split(", ");
      scale = parseFloat(values[0]); // 'a' in matrix(a, b, c, d, tx, ty) represents uniform scaling
    }
  }

  return scale;
};
