import { gql } from 'apollo-server'

export const typeDef = gql`
  type Query {
    climb(uuid: ID): Climb
  }

  "A climbing route or a boulder problem"
  type Climb {
    id: ID!
    """
    The UUID of the climb is the field used for identification.
    The id field is used in internal database relations, most GQL
    queries will use the uuid field.
    """
    uuid: ID!
    "The name that this climb is commonly identified by"
    name: String!
    "First ascent, if known. Who was the first person to climb this route?"
    fa: String
    "The grade(s) assigned to this climb. See GradeType documentation"
    grades: GradeType!

    """
    Grade systems have minor variations between countries.
    gradeContext is a short abbreviated string that identifies the
    context in which the grade was assigned.
    """
    gradeContext: String

    type: ClimbType!
    safety: SafetyEnum
    metadata: ClimbMetadata!

    """
    Composable attributes for this climb, these are the bread and butter
    guidebook-like data that make up the bulk of the text beta for this climb
    """
    content: Content!

    """
    Area names traversing up the heirarchy from this climbs immediate
    parent to the root area.
    """
    pathTokens: [String!]!

    """
    Area UUIDs traversing up the heirarchy from this climbs immediate
    parent to the root area.
    """
    ancestors: [String!]!

    "Media associated with this climb"
    media: [MediaTagType]

    yds: String @deprecated(reason: "migrating to grades field")
  }

  type ClimbMetadata {
    lat: Float
    lng: Float
    left_right_index: Int
    leftRightIndex: Int
    "If this climb was scraped from Mountain Project, this is the ID"
    mp_id: String
    climb_id: ID!
    climbId: ID!
  }

  """
  Composable attributes for this climb, these are the bread and butter
  guidebook-like data that make up the bulk of the text beta for this climb
  """
  type Content {
    """
    The description of this climb, this is the main text field for this climb.
    This contains beta, visual descriptors, and any other information useful
    to identifying and attempting the climb
    """
    description: String
    """
    Information regarding Approach and other location context for this climb.
    Could also include information about the situation of this specific climb.
    """
    location: String
    """
    What do climbers need to know about making a safe attempt of this climb?
    What gear do they need, what are the hazards, etc.
    """
    protection: String
  }

  """
  What sort of climb is this? Routes can combine these fields, which is why
  this is not an enumeration.

  For example, a route may be a sport route, but also a top rope route.
  """
  type ClimbType {
    "https://en.wikipedia.org/wiki/Traditional_climbing"
    trad: Boolean
    "https://en.wikipedia.org/wiki/Sport_climbing"
    sport: Boolean
    "https://en.wikipedia.org/wiki/Bouldering"
    bouldering: Boolean
    "https://en.wikipedia.org/wiki/Alpine_climbing"
    alpine: Boolean
    "https://en.wikipedia.org/wiki/Ice_climbing"
    snow: Boolean
    "https://en.wikipedia.org/wiki/Ice_climbing"
    ice: Boolean
    mixed: Boolean
    "https://en.wikipedia.org/wiki/Aid_climbing"
    aid: Boolean
    "https://en.wikipedia.org/wiki/Top_rope_climbing"
    tr: Boolean
  }

  """
  There are a number of grading systems around the world, this enum
  specifies the system. Developers will then use the key to best understand
  its value.

  https://en.wikipedia.org/wiki/Grade_(climbing)
  """
  type GradeType {
    """
    https://www.99boulders.com/bouldering-grades#v-scale
    """
    vscale: String
    """
    Yosemite Decimal System
    https://en.wikipedia.org/wiki/Grade_(climbing)#Yosemite_Decimal_System
    """
    yds: String
    french: String
    """
    Fontainebleau grading system, the most widely used grading system in Europe.
    Mostly used for bouldering.
    https://www.99boulders.com/bouldering-grades#font-scale-aka-fontainebleau-scale
    """
    font: String
  }
  
  """
  rating indicates the quality and spacing of a route's available protection for a 
  competent climber. Amusingly, the letter codes associated with the different 
  protection ratings are based on the American system for movie ratings:
  """
  enum SafetyEnum {
    UNSPECIFIED
    "Generally good protection with a few sections of poor protection"
    PG
    "Fair protection that may result in long, potentially dangerous falls"
    PG13
    "Loosely refers to "runout terrain," where there's limited protection and the possibility of serious injury"
    R
    "No protection and overall the route is extremely dangerous."
    X
  }
`
