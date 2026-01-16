package com.library.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "BooksCollection")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    private String id;

    @Field("ISBN")
    private String isbn;                  // String, not number

    @Field("Book-Title")
    private String title;

    @Field("Book-Author")
    private String author;

    @Field("Year-Of-Publication")
    private String yearOfPublication;     // change to String to be safe

    @Field("Publisher")
    private String publisher;             // must be String

    @Field("Image-URL-S")
    private String imageUrlS;

    @Field("Image-URL-M")
    private String imageUrlM;

    @Field("Image-URL-L")
    private String imageUrlL;
}
