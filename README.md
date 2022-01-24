# downbad

- fix yo damn habits, one at a time

## Step 1 track it

- drinking, smoking, biting your nails... how many times do you do it everyday?

  - what is the name of your habit? name : str
  - why is it bad for you or why do you want to get rid of it intent : str
  - what time do you usually do this? timestamp : long/date
  - have you fixed this habit? reformed : bool

- Enhancement: if possible, find out why you do it
  - what were you doing? what were you thinking? and how are you feeling

## Goals

- build a react native app for my android and ios

## Questions

- [ ] does mobile app have on-device database?
  - I presume its not uncommon, but prolly won't be used for this project

### Design Doc

- some data stuff

  1. Naive - SQL
     | name | intent | timestamp | reformed |
     |-------------------|----------------------------------|---------------|---------------|
     | picking yo nose | don't want boogers everywhere | 2am 1-2-2022 | false |
     | picking yo nose | don't want boogers everywhere | 7am 1-2-2022 | false |
     | picking yo nose | don't want boogers everywhere | 11am 1-2-2022 | false |

  - 1 row for every time it occurs is not efficient
    - although... it is relational, and subscribe to '[first normal form](https://stackoverflow.com/questions/3070384/how-to-store-a-list-in-a-column-of-a-database-table)'
  - name and intent is duplicated, reformed is mostly dupliated
    - needs a map? <day: count>
  - need to check all records, sorted by latest timestamp, to see if you have been 'reformed'
    - separate table for reformed status for the habit?

  2.  With occurence mapping - SQL
      | name | intent | day | count | reformed |
      |-------------------|----------------------------------|------------|-------|---------------|
      | picking yo nose | don't want boogers everywhere | 1-2-2022 | 5 | false |
      | picking yo nose | don't want boogers everywhere | 1-3-2022 | 4 | false |

  - scales linearly with time lol
  - loses nuance of when the habit is triggered, what time of day

  3. Hybrid
     | name | intent | occurences: jsonb | reformed |
     |-------------------|----------------------------------|----------------------------------------|-----------|
     | picking yo nose | don't want boogers everywhere | {"timestamps": [2am 1-2-2022, ...]} | false |

  - why not just NoSQL at this point?

  4. Postgres Arrays
     | name | intent | occurences: long[] | reformed |
     |-------------------|----------------------------------|------------------------|-----------|
     | picking yo nose | don't want boogers everywhere | [2am 1-2-2022, ...] | false |

  5. NoSQL

  ```
  {
      name: str,
      intent: str,
      occurences: date[],
      reformed: bool
  }
  ```

  - feels like the way to go for flexiblility

### Database Tech

- some research [link](https://pusher.com/tutorials/persisting-data-react-native/), [link](https://stackoverflow.com/questions/44376002/what-are-my-options-for-storing-data-when-using-react-native-ios-and-android)

1. React Native SQLite 2

- seems like the db file is somewhere on the phone and persisted there
- might be a good starter for testing
  - so that I can migrate/refactor to a cloud database, GCP Cloud SQL or FireStore?

2. Realm

- seems pretty good 🤔
- 'can be combined with server-side databases to allow seamless synchronization of data offline to the cloud/server database. '
- 'a fantastic choice if you’ll be dealing with large data in your application.'

3. Firebase

- also seems pretty good
- could also do a serverless backend, using Cloud Functions for Firebase
- seems popular

## Dev log

- 1/8:

  ~~Feel like NoSQL might be the way to go, but will stick with the naive approach to see how things really will turn out.
  userId field is ignored for now, though it seems easy to just add another column/field.~~

- 1/12:
  - misc.
    - point android/local.properies sdk.dir to X:\android_sdk
    - `X:\android_sdk\tools\bin\sdkmanager --licenses` to accept liscenses
- 1/13 - 1/16:
  - figure out why react native android breaking
    - something something jcenter down, react native version needs upgrade
  - actually started a separate repo
    - to use Expo for development and build
  - published a dummy build to Google Play Store, pending review
  - continued development, finished home screen (Create habit), added button for Tracking habit screen
- 1/17:
  - App got approved and live on the Google Play Store!!
  - need some data persistence to store data
    - and update the necessary permissions
    - and update the necessary privacy document
  - Offline mode and data persistence/syncing is a lot of headaches eh? 💀
- 1/23:
  - will try firestore for db
  - [ ] try to publish to ios
