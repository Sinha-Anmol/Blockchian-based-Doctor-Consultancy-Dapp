const Channels = ({ provider, account, dappcord, channels, currentChannel, setCurrentChannel }) => {
  const channelHandler = async (channel) => {

    const hasJoined = await dappcord.hasJoined(channel.id, account)

    if (hasJoined) {
      setCurrentChannel(channel)
    } else {
      const signer = await provider.getSigner()
      const transaction = await dappcord.connect(signer).mint(channel.id, { value: channel.cost })
      await transaction.wait()
      setCurrentChannel(channel)
    }
  }

  return (
    <div className="channels">
      <div className="channels__text">
        <h2>Departments</h2>

        <ul>
          {channels.map((channel, index) => (
            <li
              onClick={() => channelHandler(channel)} key={index}
              className={currentChannel && currentChannel.id.toString() === channel.id.toString() ? "active" : ""}>
              {channel.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="channels__voice">
        

        <ul>
        </ul>
      </div>
    </div>
  );
}

export default Channels;

// import React from 'react';

// const Channels = ({ provider, account, dappcord, channels, currentChannel, setCurrentChannel }) => {
//   const channelHandler = async (channel) => {
//     const hasJoined = await dappcord.hasJoined(channel.id, account);

//     if (hasJoined) {
//       setCurrentChannel(channel);
//     } else {
//       const signer = await provider.getSigner();
//       const transaction = await dappcord.connect(signer).mint(channel.id, { value: channel.cost });
//       await transaction.wait();
//       setCurrentChannel(channel);
//     }
//   };

  
//   const filteredChannels = channels.filter(channel => ["general"].includes(channel.name));
//   console.log(filteredChannels);

//   return (
//     <div className="channels">
//       <div className="channels__text">
//         <h2>Departments</h2>

//         <ul>
//           {filteredChannels.map((channel, index) => (
//             <li
//               onClick={() => channelHandler(channel)}
//               key={index}
//               className={currentChannel && currentChannel.id.toString() === channel.id.toString() ? "active" : ""}
//             >
//               {channel.name}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="channels__voice">
//         <ul>{""}</ul>
//       </div>
//     </div>
//   );
// };

// export default Channels;
