import "./css/SearchPopup.css"
import { useEffect, useRef, useState } from "react"
import { MdArrowDropDown } from "react-icons/md"

const SearchPopup = ({ setPopup }) => {
    const [search, setSearch] = useState("")
    
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <div 
            className="_7gxs" 
            onClick={() => setPopup(false)}
        >
            <div className="container" onClick={e => e.stopPropagation()}>
                <div className="input-container">
                    <input 
                        placeholder="Search messages"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        ref={inputRef}
                    />
                    {search ? (
                        <span onClick={() => {
                            setSearch("")
                            inputRef.current.focus()
                        }}>Clear</span>
                    ) : undefined}
                </div>
                <div className="filter-container">
                    <span>Search in</span>
                    <div>
                        <button className="active">All mail</button>
                        <button>Inbox</button>
                        <button>Drafts</button>
                        <button>Sent</button>
                        <button>
                            <span>Other</span>
                            <MdArrowDropDown />
                        </button>
                    </div>
                </div>
                <div className="button-container">
                    <span>More search options</span>
                    <button>Search</button>
                </div>
            </div>
        </div>
    )
}

export default SearchPopup
