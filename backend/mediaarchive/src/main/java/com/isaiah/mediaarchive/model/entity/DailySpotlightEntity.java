package com.isaiah.mediaarchive.model.entity;

import com.isaiah.mediaarchive.model.enums.DailySpotlightEnum;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "daily_spotlights")
public class DailySpotlightEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UserEntity user;

    @Setter
    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "media_id", nullable = false, unique = true)
    private UserMediaEntity userMedia;

    @Setter
    @Column(nullable = false)
    private LocalDate spotlightDate;

    @Setter
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private DailySpotlightEnum spotlightType;

    public DailySpotlightEntity(
            UserEntity user,
            UserMediaEntity userMedia,
            LocalDate spotlightDate,
            DailySpotlightEnum spotlightType
    ) {
        this.user = user;
        this.userMedia = userMedia;
        this.spotlightDate = spotlightDate;
        this.spotlightType = spotlightType;
    }
}
