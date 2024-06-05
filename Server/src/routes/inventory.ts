import { NextFunction, Request, Response, Router } from "express";
import { redisClient } from "../redis-source";

const router = Router();

router.post(
  "/upload",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inventoryJson } = req.body;
      console.log(inventoryJson);
      let index = parseInt(await redisClient.get(`inventoryJson_index`)) || 0;

      for (const item of inventoryJson) {
        const englishItem = {
          manufacturer: item.Produsent,
          description: item.Beskrivelse,
          specifications: item.Spesifikasjoner,
          purchaseDate: item.Innkjøpsdato,
          purchasePrice: item.Innkjøpspris,
          expectedLifetime: item["Forventet levetid (i år)"],
          category: item.Kategori,
          id: item.id,
          rentedByUser: item.rentedByUser,
        };

        await redisClient.set(
          `inventory:${index}`,
          JSON.stringify(englishItem)
        );
        index++;
      }

      await redisClient.set(`inventoryJson_index`, index.toString());

      res.status(200).json({ message: "Inventory uploaded successfully" });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/get", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let index = parseInt(await redisClient.get(`inventoryJson_index`)) || 0;
    let inventory_data = [];

    for (let i = 0; i < index; i++) {
      let item = await redisClient.get(`inventory:${i}`);
      inventory_data.push(JSON.parse(item));
    }

    res.status(200).json(inventory_data);
  } catch (err) {
    next(err);
  }
});

router.delete(
  "/delete",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { description, token } = req.body;

      let index = parseInt(await redisClient.get(`inventoryJson_index`)) || 0;
      let itemFound = false;
      let username = await redisClient.hGet("tokens", token);

      for (let i = 0; i < index; i++) {
        let item = await redisClient.get(`inventory:${i}`);

        if (item) {
          const parsedItem = JSON.parse(item);

          if (parsedItem.description === description && username === "admin") {
            await redisClient.del(`inventory:${i}`);
            itemFound = true;
            break;
          }
        }
      }

      if (!itemFound) {
        res.status(400).json({ message: "Item does not exist" });
        return;
      }

      res.status(200).json({ message: "Item deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/loan",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { description, token } = req.body;

      let index = parseInt(await redisClient.get(`inventoryJson_index`)) || 0;
      let itemFound = false;
      let username = await redisClient.hGet("tokens", token);

      for (let i = 0; i < index; i++) {
        let item = await redisClient.get(`inventory:${i}`);
        const parsedItem = JSON.parse(item);

        if (item) {
          if (parsedItem.description === description) {
            if (parsedItem.rentedByUser) {
              continue;
            }

            parsedItem.rentedByUser = username;
            await redisClient.set(`inventory:${i}`, JSON.stringify(parsedItem));
            itemFound = true;
            break;
          }
        }
      }

      if (!itemFound) {
        res.status(400).json({ message: "Item does not exist" });
        return;
      }

      res.status(200).json({ message: "Item rented successfully" });
    } catch (err) {
      next(err);
    }
  }
);
router.post(
  "/return",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { description, token } = req.body;

      let index = parseInt(await redisClient.get(`inventoryJson_index`)) || 0;
      let itemFound = false;
      let username = await redisClient.hGet("tokens", token);

      for (let i = 0; i < index; i++) {
        let item = await redisClient.get(`inventory:${i}`);
        const parsedItem = JSON.parse(item);

        if (parsedItem.description === description) {
          if (parsedItem.rentedByUser !== username) {
            continue;
          }

          parsedItem.rentedByUser = null;
          await redisClient.set(`inventory:${i}`, JSON.stringify(parsedItem));
          itemFound = true;
          break;
        }
      }

      if (!itemFound) {
        res.status(400).json({ message: "Item does not exist" });
        return;
      }

      res.status(200).json({ message: "Item returned successfully" });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
