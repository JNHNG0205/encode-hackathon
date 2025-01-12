import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";

import { createWallet } from "thirdweb/wallets";

const client = createThirdwebClient({
  clientId: "....",
});

const wallets = [createWallet("io.metamask")];

export function ConnectWallet() {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      connectModal={{ size: "compact" }}
    />
  );
}

export default ConnectWallet;