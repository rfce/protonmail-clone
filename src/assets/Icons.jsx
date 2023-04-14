const UpgradeIcon = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...props}>
            <g id="a">
            <path
                fillRule="evenodd"
                d="M8.354 1.146a.5.5 0 0 0-.708 0l-5 5A.5.5 0 0 0 3 7h2v5.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V7h2a.5.5 0 0 0 .354-.854l-5-5ZM6 6H4.207L8 2.207 11.793 6H10v6H6V6Z"
            />
            <path d="M3 14.5a.5.5 0 0 1 .5-.5h9a.5.5 0 1 1 0 1h-9a.5.5 0 0 1-.5-.5Z" />
            </g>
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#a" />
        </svg>
    )
}

export { UpgradeIcon }
