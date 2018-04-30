const UrlsModel = new NGN.DATA.Model({
  fields: {
    full: {
      type: String,
      default: null
    },
    // raw: {
    //   type: String,
    //   default: null
    // },
    regular: {
      type: String,
      default: null
    },
    small: {
      type: String,
      default: null
    },
    thumb: {
      type: String,
      default: null
    },
  }
})

const LocationModel = new NGN.DATA.Model({
  fields: {
    city: {
      type: String,
      default: null
    },
    country: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    }
  },
  relationships: {
    position: new NGN.DATA.Model({
      fields: {
        latitude: {
          type: Number,
          default: null
        },
        longitude: {
          type: Number,
          default: null
        },
      }
    })
  }
})

const ProfileImageModel = new NGN.DATA.Model({
  fields: {
    large: {
      type: String,
      default: null
    },
    medium: {
      type: String,
      default: null
    },
    small: {
      type: String,
      default: null
    }
  }
})

const UserLinksModel = new NGN.DATA.Model({
  fields: {
    followers: {
      type: String,
      default: null
    },
    following: {
      type: String,
      default: null
    },
    html: {
      type: String,
      default: null
    },
    likes: {
      type: String,
      default: null
    },
    photos: {
      type: String,
      default: null
    },
    portfolio: {
      type: String,
      default: null
    },
    self: {
      type: String,
      default: null
    },
  }
})

const LinksModel = new NGN.DATA.Model({
  fields: {
    download: {
      type: String,
      default: null
    },
    download_location: {
      type: String,
      default: null
    },
    html: {
      type: String,
      default: null
    },
    self: {
      type: String,
      default: null
    },
  },
  virtuals: {
    actual_download : function () {
      return this.download + '?force=true'
    }
  }
})

const UserModel = new NGN.DATA.Model({
  fields: {
    first_name:{
      type: String,
      default: null
    },
    last_name:{
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: null
    },
    instagram_username: {
      type: String,
      default: null
    },
    location: {
      type: String,
      default: null
    },
    portfolio_url: {
      type: String,
      default: null
    },
    total_collections: {
      type: Number,
      default: null
    },
    total_likes: {
      type: Number,
      default: null
    },
    total_photos: {
      type: Number,
      default: null
    },
    twitter_username: {
      type: String,
      default: null
    },
    updated_at: {
      type: String,
      default: null
    },
    username: {
      type: String,
      default: null
    },
  },
  relationships: {
    links: UserLinksModel,
    profile_image: ProfileImageModel,

  }
})

const ExifModel = new NGN.DATA.Model({
  fields: {
    aperture: {
      type: String,
      default: null
    },
    exposure_time: {
      type: String,
      default: null
    },
    focal_length: {
      type: String,
      default: null
    },
    iso: {
      type: String,
      default: null
    },
    make: {
      type: String,
      default: null
    },
    model: {
      type: String,
      default: null
    }
  }
})

const ImageModel = new NGN.DATA.Model({
  idAttribute: 'id',
  fields: {
    categories: {
      type: Array,
      default: null
    },
    current_user_collections: {
      type: Array,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    downloads: {
      type: Number,
      default: null
    },
    id: {
      type: String,
      default: null
    },
    slug: {
      type: String,
      default: null
    },
    sponsored: {
      type: Boolean,
      default: null
    },
    updated_at: {
      type: String,
      default: null
    },
    views: {
      type: Number,
      default: null
    },
    liked_by_user: {
      type: Boolean,
      default: null
    },
    likes: {
      type: Number,
      default: null
    },
    created_at: {
      type: String,
      default: null
    },
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: null
    },
    total: {
      type: Number,
      default: null
    },
    total_pages: {
      type: Number,
      default: null
    },
    results: {
      type: Number,
      default: null
    },
    photo_tags: {
      type: Array,
      default: null
    }
  },
  relationships: {
    urls: UrlsModel,
    links: LinksModel,
    user: UserModel,
    location: LocationModel,
    exif: ExifModel
  }
})
