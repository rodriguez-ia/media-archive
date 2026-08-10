package com.isaiah.mediaarchive.model.entity;

import com.isaiah.mediaarchive.model.enums.CollectionStatusEnum;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "user_media")
public class UserMediaEntity {

    @Id
    @Column(name = "user_media_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "base_media_id", nullable = false)
    private BaseMediaEntity mediaItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Enumerated(EnumType.STRING)
    private CollectionStatusEnum status;

    private BigDecimal personalRating;

    @Column(length = 2000)
    private String notes;

    private LocalDate purchaseDate;

    private BigDecimal purchasePrice;

    private String format;

    private String condition;
}
