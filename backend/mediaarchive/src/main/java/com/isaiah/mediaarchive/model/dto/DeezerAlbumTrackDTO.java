package com.isaiah.mediaarchive.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DeezerAlbumTrackDTO {

    public long id;

    public String title;

    public int duration;

    public int track_position;

    public String preview;
}
