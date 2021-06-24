import React from 'react'

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    return (
        <div>
            <div className={notification.type}>
                {notification.message}
            </div>
        </div>
    )
}

export default Notification