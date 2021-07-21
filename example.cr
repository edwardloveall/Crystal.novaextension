alias DogType = Labrador | Poodle | Dalmation

class Dog < Species::Mammal
  BARK      = "Woof!"
  WAG_COUNT = 3

  getter name : String
  getter type : DogType

  def self.labrador(name : String)
    new(type: Labrador, name: name)
  end

  def initialize(@type : DogType, @name : String)
  end

  def speak
    BARK
  end

  def wag
    WAG_COUNT.times do
      puts "*wag's tail*"
    end
  end
end
