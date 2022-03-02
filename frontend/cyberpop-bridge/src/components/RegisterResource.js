import React from "react"

export function RegisterResource({ bridge, contractAddress }) {
    const registerResource = async (token, resourceId, handler) => {
        await bridge.adminSetResource(token, resourceId, handler)
    }
    return (
        <div>
            <h4>Register Resource</h4>
            <form
                onSubmit={(event) => {
                    // This function just calls the transferTokens callback with the
                    // form's data.
                    event.preventDefault();

                    const formData = new FormData(event.target);
                    const token = formData.get("token");
                    const resourceId = formData.get("resource_id");
                    const handler = formData.get("handler");
                    registerResource(token, resourceId, handler)
                }}
            >
                <div className="form-group">
                    <label>Token Address</label>
                    <input className="form-control" type="text" name="token" required />
                </div>
                <div className="form-group">
                    <label>Resource ID</label>
                    <input className="form-control" type="text" name="resource_id" required />
                </div>
                <div className="form-group">
                    <label>Handler</label>
                    <select className="form-control" type="text" name="handler" required>
                        <option value={contractAddress.erc20handler}>ERC20</option>
                        <option value={contractAddress.erc721handler}>ERC721</option>
                        <option value={contractAddress.erc1155handler}>ERC1155</option>
                    </select>
                </div>
                <div className="form-group">
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
            </form>
        </div>

    )
}