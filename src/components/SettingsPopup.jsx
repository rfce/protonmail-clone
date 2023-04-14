import "./css/SettingsPopup.css"

const SettingsPopup = ({ setPopup }) => {
    return (
        <div 
            className="_0afl"
            onClick={() => setPopup(false)}
        >
            <div className="container">
                <span>Go to settings</span>
                <div className="settings-box">
                    <div>
                        Beta access
                        <span>Off</span>
                    </div>
                    <div>
                        Theme
                        <span>Proton</span>
                    </div>
                </div>
                <div className="settings-box">
                    <div>
                        Keyboard shortcuts
                        <span>On</span>
                    </div>
                    <div>
                        Mailbox layout
                        <span>Column</span>
                    </div>
                    <div>
                        Mailbox density
                        <span>Comfortable</span>
                    </div>
                    <div>
                        Composer size
                        <span>Normal</span>
                    </div>
                    <span>Default email application</span>
                </div>
            </div>
        </div>
    )
}

export default SettingsPopup
