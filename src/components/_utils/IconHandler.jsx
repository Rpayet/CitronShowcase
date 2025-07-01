export default function IconHandler({ file, name, className }) {
    return (
        <svg className={`icon ${className || ''}`}>
            <use href={`/assets/images/statics/brand/${file}#${name}`}></use>
        </svg>
    );
}