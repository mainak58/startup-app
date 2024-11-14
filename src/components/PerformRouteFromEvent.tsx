

function PerformRouteFromEvent() {
    return (
        <button onClick={() => router.push(`/post/${message._id}`)}>
            Load
        </button>
    );
}

export default PerformRouteFromEvent;
