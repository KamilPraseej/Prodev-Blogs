package com.application.prodevblogs.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long blogId;
    private String imageUrl;
    private String title;
    private LocalDate date;
    private String category;
    private String content;

    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    private UserProfile userProfile;
}
