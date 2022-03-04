import React, { useState } from "react"

export function QueryResource({ bridge }) {
    const [handler, setHandler] = useState('')
    const queryResource = async (resourceId) => {
        setHandler(await bridge._resourceIDToHandlerAddress(resourceId))
    }
    return (
        <div>
            <h4>Query Resource</h4>
            {handler && (
                <div className="alert alert-success">{handler}</div>
            )}
            <form
                onSubmit={(event) => {
                    event.preventDefault();

                    const formData = new FormData(event.target);
                    const resourceId = formData.get("resource_id");
                    queryResource(resourceId)
                }}
            >
                <div className="form-group">
                    <label>Resource ID</label>
                    <input className="form-control" type="text" name="resource_id" required />
                </div>
                <div className="form-group">
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
            </form>
        </div>

    )
}