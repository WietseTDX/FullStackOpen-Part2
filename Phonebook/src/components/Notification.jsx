import './Notification.css'

const Notification = ({ data }) => {
    if (data.message === null) {
        return null;
    }

    return (
        <div className={data.error ? 'error' : 'succes'}>
            {data.message}
        </div>
    );
}

export default Notification
