import { useState, useEffect, useRef } from 'react';

function useHover() {
    const [isHovered, setIsHoverd] = useState(false);
    const ref = useRef(null);

    const handleMouseOver = () => setIsHoverd(true);
    const handleMouseOut = () => setIsHoverd(false);

    useEffect(() => {
        const node = ref.current;
        if (node) {
            node.addEventListener('mouseover', handleMouseOver);
            node.addEventListener('mouseout', handleMouseOut);

            return () => {
                node.removeEventListener('mouseover', handleMouseOver);
                node.removeEventListener('mouseout', handleMouseOut);
            };
        }
    }, [ref.current]);

    return [ref, isHovered];
}

export default useHover;
