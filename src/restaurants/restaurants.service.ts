import { Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Raw, Repository } from 'typeorm';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import { User } from '../users/entities/user.entity';
import { Category } from './entities/category.entity';
import {
  EditRestaurantInput,
  EditRestaurantOutput,
} from './dtos/edit-restaurant.dto';
import { CategoryRepository } from './repositories/category.repository';
import {
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
} from './dtos/delete-restaurant.dto';
import { CoreOutput } from '../common/dtos/output.dto';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
import { CategoryInput, CategoryOutput } from './dtos/category.dto';
import { RestaurantsInput, RestaurantsOutput } from './dtos/restaurants.dto';
import { RestaurantInput, RestaurantOutput } from './dtos/restaurant.dto';
import {
  SearchRestaurantsInput,
  SearchRestaurantsOutput,
} from './dtos/search-restaurant.dto';
@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    @InjectRepository(Category)
    private readonly categories: CategoryRepository,
  ) {}

  async createRestaurant(
    owner: User,
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurant = this.restaurants.create(createRestaurantInput);
      newRestaurant.owner = owner;
      const category = await this.categories.getOrCreate(
        createRestaurantInput.categoryName,
      );
      newRestaurant.category = category;
      await this.restaurants.save(newRestaurant);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not create Restaurant',
      };
    }
  }

  async editRestaurant(
    owner: User,
    editRestaurantInput: EditRestaurantInput,
  ): Promise<EditRestaurantOutput> {
    try {
      const ownRestaurantOutput = await this.checkOwnRestaurant(
        editRestaurantInput.restaurantId,
        owner.id,
        'edit',
      );
      if (!ownRestaurantOutput.ok) {
        return ownRestaurantOutput;
      }

      let category: Category = null;

      if (editRestaurantInput.categoryName) {
        category = await this.categories.getOrCreate(
          editRestaurantInput.categoryName,
        );
      }

      await this.restaurants.save([
        {
          id: editRestaurantInput.restaurantId,
          ...editRestaurantInput,
          ...(category && { category }),
        },
      ]);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not edit restaurant',
      };
    }
  }

  async deleteRestaurant(
    owner: User,
    { restaurantId }: DeleteRestaurantInput,
  ): Promise<DeleteRestaurantOutput> {
    try {
      const ownRestaurantOutput = await this.checkOwnRestaurant(
        restaurantId,
        owner.id,
        'delete',
      );
      if (!ownRestaurantOutput.ok) {
        return ownRestaurantOutput;
      }

      await this.restaurants.delete(restaurantId);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not delete',
      };
    }
  }

  async checkOwnRestaurant(
    restaurantId: number,
    ownerId: number,
    method: string,
  ): Promise<CoreOutput> {
    const restaurant = await this.restaurants.findOne(restaurantId);

    if (!restaurant) {
      return {
        ok: false,
        error: 'Restaurant not found',
      };
    }

    if (ownerId !== restaurant.ownerId) {
      return {
        ok: false,
        error: `You can't ${method} a restaurant that you don't own`,
      };
    }

    return {
      ok: true,
    };
  }

  async allCategories(): Promise<AllCategoriesOutput> {
    try {
      const categories = await this.categories.find();
      return {
        ok: true,
        categories: categories,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not load categories',
      };
    }
  }

  countRestaurants(category: Category) {
    return this.restaurants.count({ category });
  }

  async findCategoryBySlug({
    slug,
    page,
  }: CategoryInput): Promise<CategoryOutput> {
    try {
      const category = await this.categories.findOne({ slug });
      if (!category) {
        return {
          ok: false,
          error: 'Category not found',
        };
      }

      const restaurants = await this.restaurants.find({
        where: {
          category,
        },
        take: 10,
        skip: (page - 1) * 10,
      });
      const totalResults = await this.countRestaurants(category);
      return {
        ok: true,
        category,
        restaurants,
        totalPages: Math.ceil(totalResults / 10),
        results: totalResults,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load category',
      };
    }
  }

  async allRestaurants({ page }: RestaurantsInput): Promise<RestaurantsOutput> {
    try {
      const [restaurants, totalResults] = await this.restaurants.findAndCount({
        take: 10,
        skip: (page - 1) * 10,
      });

      return {
        ok: true,
        restaurants,
        totalPages: Math.ceil(totalResults / 10),
        results: totalResults,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load restaurants',
      };
    }
  }

  async findRestaurantById({
    restaurantId,
  }: RestaurantInput): Promise<RestaurantOutput> {
    try {
      const restaurant = await this.restaurants.findOne(restaurantId);
      if (!restaurant) {
        return {
          ok: false,
          error: 'Restaurant not found',
        };
      }
      return {
        ok: true,
        restaurant,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not find restaurant',
      };
    }
  }

  async searchRestaurants({
    page,
    query,
  }: SearchRestaurantsInput): Promise<SearchRestaurantsOutput> {
    try {
      const [restaurants, totalResults] = await this.restaurants.findAndCount({
        where: {
          name: Raw((name) => `${name} ILIKE '%${query}%'`),
        },
        take: 10,
        skip: (page - 1) * 10,
      });
      return {
        ok: true,
        restaurants,
        results: totalResults,
        totalPages: Math.ceil(totalResults / 10),
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not search for restaurant',
      };
    }
  }
}
