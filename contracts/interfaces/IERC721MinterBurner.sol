// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity 0.8.11;

/**
    @title Interface for ERC721 contract.
    @author CyberPop Ltd.
 */
interface IERC721MinterBurner {
    /**
        @notice Mint a token to recipient, need MINTER_ROLE
     */
    function safeMint(address recipient, uint256 tokenId) external;

    /**
     * @notice Burn token ID, need to be approved from owner
     */
    function burn(uint256 tokenId) external;
}
