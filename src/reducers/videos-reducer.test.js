import { videosReducer } from ".";

describe("testing videos reducer for playlist functons", () => {
  it("should add video to watched videos playlist as history", () => {
    const initialState = {
      playlists: [
        {
          _id: "60cf67081a266203cfd693b8",
          videos: [],
        },
      ],
    };

    const payload = {
      videoId: "60c13432641ba101909655e9",
      playlistId: "60cf67081a266203cfd693b8",
    };

    const action = {
      type: "ADD_TO_HISTORY",
      payload,
    };

    const state = videosReducer(initialState, action);

    expect(state).toEqual({
      playlists: [
        {
          _id: "60cf67081a266203cfd693b8",
          videos: ["60c13432641ba101909655e9"],
        },
      ],
    });
  });

  it("should add video to playlist if not present, and should remove video from playlsit if already present", () => {
    const initialState = {
      playlists: [
        {
          _id: "60cf67081a266203cfd693ba",
          videos: ["60c13432641ba101909655e7"],
        },
      ],
    };

    const payload1 = {
      videoId: "60c13432641ba101909655e8",
      playlistId: "60cf67081a266203cfd693ba",
    };

    const action = {
      type: "TOGGLE_IN_PLAYLIST",
      payload: payload1,
    };

    const state1 = videosReducer(initialState, action);

    expect(state1).toEqual({
      playlists: [
        {
          _id: "60cf67081a266203cfd693ba",
          videos: ["60c13432641ba101909655e7", "60c13432641ba101909655e8"],
        },
      ],
    });

    const payload2 = {
      videoId: "60c13432641ba101909655e7",
      playlistId: "60cf67081a266203cfd693ba",
    };

    const action2 = {
      type: "TOGGLE_IN_PLAYLIST",
      payload: payload2,
    };

    const state2 = videosReducer(initialState, action2);

    expect(state2).toEqual({
      playlists: [
        {
          _id: "60cf67081a266203cfd693ba",
          videos: [],
        },
      ],
    });
  });

  it("should create a new playlist", () => {
    const initialState = {
      playlists: [],
    };

    const newPlaylist = {
      _id: "60d056748bf7fe0029131672",
      playlistName: "web dev videos",
      videoId: "60c13432641ba101909655e6",
    };

    const action = {
      type: "CREATE_NEW_PLAYLIST",
      payload: newPlaylist,
    };

    const state = videosReducer(initialState, action);

    expect(state).toEqual({
      playlists: [
        {
          _id: "60d056748bf7fe0029131672",
          name: "web dev videos",
          videos: ["60c13432641ba101909655e6"],
        },
      ],
    });
  });

  it("should update name of the playlist", () => {
    const initialState = {
      playlists: [
        {
          _id: "60d056748bf7fe0029131672",
          name: "web dev videos",
          videoId: "60c13432641ba101909655e6",
        },
      ],
    };

    const payload = {
      _id: "60d056748bf7fe0029131672",
      name: "web dev videos updated",
    };

    const action = {
      type: "UPDATE_PLAYLIST_NAME",
      payload,
    };

    const state = videosReducer(initialState, action);

    expect(state).toEqual({
      playlists: [
        {
          _id: "60d056748bf7fe0029131672",
          name: "web dev videos updated",
          videoId: "60c13432641ba101909655e6",
        },
      ],
    });
  });

  it("should delete whole playlist", () => {
    const initialState = {
      playlists: [
        {
          _id: "60d056748bf7fe0029131672",
          name: "web dev videos",
          videoId: "60c13432641ba101909655e6",
        },
      ],
    };

    const payload = {
      playlistId: "60d056748bf7fe0029131672",
    };

    const action = {
      type: "DELETE_PLAYLIST",
      payload,
    };

    const state = videosReducer(initialState, action);

    expect(state).toEqual({
      playlists: [],
    });
  });

  it("should remove all videos from playlist", () => {
    const initialState = {
      playlists: [
        {
          _id: "60cf67081a266203cfd693ba",
          videos: ["60c13432641ba101909655e7", "60c13432641ba101909655e8"],
        },
      ],
    };

    const payload = {
      playlistId: "60cf67081a266203cfd693ba",
    };

    const action = {
      type: "REMOVE_ALL_VIDEOS",
      payload,
    };

    const state = videosReducer(initialState, action);

    expect(state).toEqual({
      playlists: [
        {
          _id: "60cf67081a266203cfd693ba",
          videos: [],
        },
      ],
    });
  });

  it("should remove all playlists with their data", () => {
    const initialState = {
      playlists: [
        {
          _id: "60cf67081a266203cfd693ba",
        },
        {
          _id: "60cf67081a266203cfd693b9",
        },
        {
          _id: "60cf67081a266203cfd693ba",
        },
        {
          _id: "60cf67081a266203cfd693bb",
        },
      ],
    };

    const action = {
      type: "RESET_PLAYLISTS",
    };

    const state = videosReducer(initialState, action);

    expect(state).toEqual({
      playlists: [],
    });
  });
});
