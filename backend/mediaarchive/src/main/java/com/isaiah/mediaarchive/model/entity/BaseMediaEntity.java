package com.isaiah.mediaarchive.model.entity;

import com.isaiah.mediaarchive.model.enums.GenreEnum;
import com.isaiah.mediaarchive.model.enums.MediaTypeEnum;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Table(name = "base_media")
public class BaseMediaEntity {

    @Id
    @Column(name = "base_media_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String externalId;

    @Column(nullable = false)
    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MediaTypeEnum mediaType;

    @ElementCollection(targetClass = GenreEnum.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(
            name = "media_genres",
            joinColumns = @JoinColumn(
                name = "base_media_id",
                referencedColumnName = "base_media_id"
            )
    )
    @Column(name = "genre")
    private Set<GenreEnum> genres = new HashSet<>();

    private LocalDate releaseDate;

    private Integer communityRating;

    private String coverImgUrl;

    private Integer sortOrder;
}
