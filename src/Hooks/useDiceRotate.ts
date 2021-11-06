export default function useDiceRotate(): () => void {
    function getRandom(max: number, min: number) {
        return (Math.floor(Math.random() * (max - min)) + min) * 90;
    }
    const rotate = (
        max: number,
        min: number,
        cube: HTMLElement | null,
    ): void => {
        const xRand = getRandom(max, min);
        const yRand = getRandom(max, min);
        const CubeDOM = cube;
        if (!CubeDOM) return;
        CubeDOM.style.transform = `rotateX(${xRand}deg) rotateY(${yRand}deg)`;
    };
    const handleClick = () => {
        const cube = document.getElementById("cube");
        const min = 1;
        const max = 50;
        rotate(max, min, cube);
    };
    return handleClick;
}
