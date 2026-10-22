package com.isaiah.mediaarchive.model.dto;

import lombok.Getter;

@Getter
public class MediaSummaryResponseDTO {

    private int ownedTotal;

    private int ownedMoviesCount;

    private int ownedTVShowsCount;

    private int ownedMusicAlbumsCount;

    private int ownedBooksCount;

    private int wishlistedTotal;

    private int wishlistedMoviesCount;

    private int wishlistedTVShowsCount;

    private int wishlistedMusicAlbumsCount;

    private int wishlistedBooksCount;

    public MediaSummaryResponseDTO(
            Long ownedTotal,
            Long ownedMoviesCount,
            Long ownedTVShowsCount,
            Long ownedMusicAlbumsCount,
            Long ownedBooksCount,
            Long wishlistedTotal,
            Long wishlistedMoviesCount,
            Long wishlistedTVShowsCount,
            Long wishlistedMusicAlbumsCount,
            Long wishlistedBooksCount
    ) {
        this.ownedTotal = ownedTotal.intValue();
        this.ownedMoviesCount = ownedMoviesCount.intValue();
        this.ownedTVShowsCount = ownedTVShowsCount.intValue();
        this.ownedMusicAlbumsCount = ownedMusicAlbumsCount.intValue();
        this.ownedBooksCount = ownedBooksCount.intValue();
        this.wishlistedTotal = wishlistedTotal.intValue();
        this.wishlistedMoviesCount = wishlistedMoviesCount.intValue();
        this.wishlistedTVShowsCount = wishlistedTVShowsCount.intValue();
        this.wishlistedMusicAlbumsCount = wishlistedMusicAlbumsCount.intValue();
        this.wishlistedBooksCount = wishlistedBooksCount.intValue();
    }
}
