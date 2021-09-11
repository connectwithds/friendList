import React, { useState, useEffect } from "react";

import "../css/main.css";

const Container = () => {
  const [friends, setFriends] = useState([
    {
      name: "shubham",
      isFav: true,
    },
    {
      name: "sonu",
      isFav: false,
    },
  ]);
  const [newFriend, setNewFriend] = useState("");

  useEffect(() => {}, []);

  const handleInput = () => {
    if (newFriend.trim().length !== 0) {
      setFriends([...friends, { name: newFriend, isFav: false }]);
      setNewFriend("");
    } else {
      alert("Please Enter Valid Name");
    }
  };

  const handleFavButton = (id) => {
    let item = friends[id];
    item.isFav = !item.isFav;
    friends[id] = item;

    friends.sort((friend) => {
      return friend.isFav ? -1 : 1; // `false` values first
    });
    console.log(friends);
    setFriends([...friends]);
  };
  const handleDeleteButton = (id) => {
    friends.splice(id, 1);
    setFriends([...friends]);
  };

  const handleChange = (value) => {
    console.log(value);
    setNewFriend(value);
  };

  return (
    <>
      <div className="friendListContainer">
        <div className="title">
          <h1>Friends List</h1>
        </div>
        <div className="searchBox">
          <input
            type="text"
            value={newFriend}
            placeholder="Enter your friend's name..."
            onChange={(e) => handleChange(e.target.value)}
            onKeyUp={(e) => (e.key === "Enter" ? handleInput() : null)}
          />
        </div>
        <div className="friendlist-items-wrapper">
          <div className="friendListItems">
            <ul className="friendListItems-ul">
              {friends
                .filter(
                  (friend) =>
                    friend.name
                      .toLowerCase()
                      .indexOf(newFriend.toLowerCase()) !== -1
                )
                .map((item, id) => {
                  return (
                    <li>
                      <div class="friendListItemsContent">
                        <strong>{item.name}</strong>
                        <br />
                        <span>is your friend</span>
                      </div>
                      <div class="friendListItemsActions">
                        <button onClick={() => handleFavButton(id)}>
                          {item.isFav ? (
                            <i class="material-icons">star</i>
                          ) : (
                            <i class="material-icons">star_outline</i>
                          )}
                        </button>

                        <button onClick={() => handleDeleteButton(id)}>
                          <i class="material-icons">delete</i>
                        </button>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Container;
