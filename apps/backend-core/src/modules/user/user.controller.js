/**
 * @fileoverview Module nÃ y Ä‘Ã³ng vai trÃ² lÃ  Controller xá»­ lÃ½ cÃ¡c yÃªu cáº§u (requests) HTTP liÃªn quan Ä‘áº¿n ngÆ°á»i dÃ¹ng (User).
 * @module UserController
 */
const UserService = require("./user.service");
const ResponseHelper = require("../../utils/response.helper");
const cloudinary = require("../../config/cloudinary");

const UserController = {
  /**
   * Láº¥y danh sÃ¡ch táº¥t cáº£ ngÆ°á»i dÃ¹ng kÃ¨m theo cÃ¡c bá»™ lá»c tÃ¹y chá»n.
   *
   * @async
   * @param {Object} req - Äá»‘i tÆ°á»£ng request cá»§a Express chá»©a cÃ¡c tham sá»‘ query (req.query).
   * @param {Object} res - Äá»‘i tÆ°á»£ng response cá»§a Express.
   * @param {Function} next - HÃ m middleware chuyá»ƒn tiáº¿p lá»—i.
   * @returns {Promise<void>}
   */
  async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const users = await UserService.getAllUsers(filters);
      return ResponseHelper.success(res, users);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Láº¥y thÃ´ng tin chi tiáº¿t cá»§a má»™t ngÆ°á»i dÃ¹ng theo ID.
   *
   * @async
   * @param {Object} req - Äá»‘i tÆ°á»£ng request cá»§a Express chá»©a ID ngÆ°á»i dÃ¹ng trong tham sá»‘ URL (req.params.id).
   * @param {Object} res - Äá»‘i tÆ°á»£ng response cá»§a Express.
   * @param {Function} next - HÃ m middleware chuyá»ƒn tiáº¿p lá»—i.
   * @returns {Promise<void>}
   */
  async getById(req, res, next) {
    try {
      const user = await UserService.getUserById(req.params.id);
      return ResponseHelper.success(res, user);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Táº¡o má»™t tÃ i khoáº£n ngÆ°á»i dÃ¹ng má»›i.
   *
   * @async
   * @param {Object} req - Äá»‘i tÆ°á»£ng request cá»§a Express chá»©a dá»¯ liá»‡u ngÆ°á»i dÃ¹ng (req.body).
   * @param {Object} res - Äá»‘i tÆ°á»£ng response cá»§a Express.
   * @param {Function} next - HÃ m middleware chuyá»ƒn tiáº¿p lá»—i.
   * @returns {Promise<void>}
   */
  async create(req, res, next) {
    try {
      const payload = { ...req.body };
      const user = await UserService.createUser(payload);
      return ResponseHelper.created(res, user);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Cáº­p nháº­t thÃ´ng tin cá»§a má»™t ngÆ°á»i dÃ¹ng dá»±a theo ID.
   *
   * @async
   * @param {Object} req - Äá»‘i tÆ°á»£ng request cá»§a Express chá»©a ID (req.params.id) vÃ  thÃ´ng tin cáº§n cáº­p nháº­t (req.body).
   * @param {Object} res - Äá»‘i tÆ°á»£ng response cá»§a Express.
   * @param {Function} next - HÃ m middleware chuyá»ƒn tiáº¿p lá»—i.
   * @returns {Promise<void>}
   */
  async update(req, res, next) {
    try {
      const payload = { ...req.body };
      const user = await UserService.updateUser(req.params.id, payload);
      return ResponseHelper.success(res, user);
    } catch (error) {
      next(error);
    }
  },

  /**
   * XÃ³a má»m (soft delete) má»™t ngÆ°á»i dÃ¹ng theo ID.
   *
   * @async
   * @param {Object} req - Äá»‘i tÆ°á»£ng request cá»§a Express chá»©a ID cá»§a ngÆ°á»i dÃ¹ng cáº§n xÃ³a.
   * @param {Object} res - Äá»‘i tÆ°á»£ng response cá»§a Express.
   * @param {Function} next - HÃ m middleware chuyá»ƒn tiáº¿p lá»—i.
   * @returns {Promise<void>}
   */
  async delete(req, res, next) {
    try {
      await UserService.deleteUser(req.params.id);
      return ResponseHelper.success(res, null, "XÃ³a ngÆ°á»i dÃ¹ng thÃ nh cÃ´ng");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Láº¥y danh sÃ¡ch ngÆ°á»i dÃ¹ng Ä‘Ã£ bá»‹ xÃ³a má»m (trong thÃ¹ng rÃ¡c).
   *
   * @async
   * @param {Object} req - Äá»‘i tÆ°á»£ng request cá»§a Express chá»©a cÃ¡c tham sá»‘ bá»™ lá»c.
   * @param {Object} res - Äá»‘i tÆ°á»£ng response cá»§a Express.
   * @param {Function} next - HÃ m middleware chuyá»ƒn tiáº¿p lá»—i.
   * @returns {Promise<void>}
   */
  async getTrash(req, res, next) {
    try {
      const filters = { ...req.query };
      const users = await UserService.getTrash(filters);
      return ResponseHelper.success(res, users);
    } catch (error) {
      next(error);
    }
  },

  /**
   * KhÃ´i phá»¥c tÃ i khoáº£n cá»§a má»™t ngÆ°á»i dÃ¹ng Ä‘Ã£ bá»‹ xÃ³a má»m.
   *
   * @async
   * @param {Object} req - Äá»‘i tÆ°á»£ng request cá»§a Express chá»©a ID cá»§a ngÆ°á»i dÃ¹ng cáº§n khÃ´i phá»¥c.
   * @param {Object} res - Äá»‘i tÆ°á»£ng response cá»§a Express.
   * @param {Function} next - HÃ m middleware chuyá»ƒn tiáº¿p lá»—i.
   * @returns {Promise<void>}
   */
  async restore(req, res, next) {
    try {
      await UserService.restoreUser(req.params.id);
      return ResponseHelper.success(res, null, "KhÃ´i phá»¥c ngÆ°á»i dÃ¹ng thÃ nh cÃ´ng");
    } catch (error) {
      next(error);
    }
  },

  /**
   * KhÃ³a (lock) tÃ i khoáº£n cá»§a má»™t ngÆ°á»i dÃ¹ng.
   *
   * @async
   * @param {Object} req - Äá»‘i tÆ°á»£ng request cá»§a Express chá»©a ID cá»§a ngÆ°á»i dÃ¹ng cáº§n khÃ³a.
   * @param {Object} res - Äá»‘i tÆ°á»£ng response cá»§a Express.
   * @param {Function} next - HÃ m middleware chuyá»ƒn tiáº¿p lá»—i.
   * @returns {Promise<void>}
   */
  async lockUser(req, res, next) {
    try {
      await UserService.lockUser(req.params.id);
      return ResponseHelper.success(res, null, "KhÃ³a tÃ i khoáº£n thÃ nh cÃ´ng");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Má»Ÿ khÃ³a (unlock) tÃ i khoáº£n cho má»™t ngÆ°á»i dÃ¹ng.
   *
   * @async
   * @param {Object} req - Äá»‘i tÆ°á»£ng request cá»§a Express chá»©a ID cá»§a ngÆ°á»i dÃ¹ng cáº§n má»Ÿ khÃ³a.
   * @param {Object} res - Äá»‘i tÆ°á»£ng response cá»§a Express.
   * @param {Function} next - HÃ m middleware chuyá»ƒn tiáº¿p lá»—i.
   * @returns {Promise<void>}
   */
  async unlockUser(req, res, next) {
    try {
      await UserService.unlockUser(req.params.id);
      return ResponseHelper.success(res, null, "Má»Ÿ khÃ³a tÃ i khoáº£n thÃ nh cÃ´ng");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Láº¥y thÃ´ng tin cÃ¡ nhÃ¢n cá»§a ngÆ°á»i dÃ¹ng Ä‘ang Ä‘Äƒng nháº­p (Profile).
   *
   * @async
   * @param {Object} req - Äá»‘i tÆ°á»£ng request cá»§a Express chá»©a thÃ´ng tin ngÆ°á»i dÃ¹ng Ä‘Æ°á»£c xÃ¡c thá»±c (req.user).
   * @param {Object} res - Äá»‘i tÆ°á»£ng response cá»§a Express.
   * @param {Function} next - HÃ m middleware chuyá»ƒn tiáº¿p lá»—i.
   * @returns {Promise<void>}
   */
  async getMyProfile(req, res, next) {
    try {
      const user = await UserService.getUserById(req.user.id);
      return ResponseHelper.success(res, user);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Cáº­p nháº­t thÃ´ng tin cÃ¡ nhÃ¢n cá»§a ngÆ°á»i dÃ¹ng Ä‘ang Ä‘Äƒng nháº­p.
   * (Loáº¡i bá» cÃ¡c trÆ°á»ng nháº£y cáº£m nhÆ° password, role_id, status)
   *
   * @async
   * @param {Object} req - Äá»‘i tÆ°á»£ng request cá»§a Express chá»©a thÃ´ng tin cáº­p nháº­t trong req.body.
   * @param {Object} res - Äá»‘i tÆ°á»£ng response cá»§a Express.
   * @param {Function} next - HÃ m middleware chuyá»ƒn tiáº¿p lá»—i.
   * @returns {Promise<void>}
   */
  async updateMyProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const { password, role_id, status, ...updateData } = req.body;
      const user = await UserService.updateUser(userId, updateData);
      return ResponseHelper.success(res, user);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Thay Ä‘á»•i máº­t kháº©u cá»§a ngÆ°á»i dÃ¹ng Ä‘ang Ä‘Äƒng nháº­p.
   *
   * @async
   * @param {Object} req - Äá»‘i tÆ°á»£ng request cá»§a Express chá»©a máº­t kháº©u cÅ© (currentPassword) vÃ  máº­t kháº©u má»›i (newPassword).
   * @param {Object} res - Äá»‘i tÆ°á»£ng response cá»§a Express.
   * @param {Function} next - HÃ m middleware chuyá»ƒn tiáº¿p lá»—i.
   * @returns {Promise<void|Object>} Tráº£ vá» thÃ´ng bÃ¡o lá»—i náº¿u dá»¯ liá»‡u khÃ´ng há»£p lá»‡.
   */
  async changeMyPassword(req, res, next) {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) { return ResponseHelper.error(res, "Vui lòng cung cấp mật khẩu cũ và mới"); } if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]).{8,}$/.test(newPassword)) { return ResponseHelper.error(res, "Mật khẩu phải từ 8 ký tự trở lên, chứa ít nhất một chữ hoa, một chữ thường và một ký tự đặc biệt"); } if (!currentPassword) {
        return ResponseHelper.error(res, "Vui lÃ²ng cung cáº¥p máº­t kháº©u cÅ© vÃ  má»›i");
      }
      await UserService.updateUser(userId, { currentPassword, newPassword });
      return ResponseHelper.success(res, null, "Äá»•i máº­t kháº©u thÃ nh cÃ´ng");
    } catch (error) {
      next(error);
    }
  },

  /**
   * Cáº­p nháº­t áº£nh Ä‘áº¡i diá»‡n (avatar) cá»§a ngÆ°á»i dÃ¹ng Ä‘ang Ä‘Äƒng nháº­p.
   * áº¢nh sáº½ Ä‘Æ°á»£c táº£i lÃªn dá»‹ch vá»¥ Cloudinary.
   *
   * @async
   * @param {Object} req - Äá»‘i tÆ°á»£ng request cá»§a Express chá»©a tá»‡p hÃ¬nh áº£nh Ä‘Æ°á»£c táº£i lÃªn (req.file).
   * @param {Object} res - Äá»‘i tÆ°á»£ng response cá»§a Express.
   * @param {Function} next - HÃ m middleware chuyá»ƒn tiáº¿p lá»—i.
   * @returns {Promise<void|Object>} Tráº£ vá» URL cá»§a avatar má»›i.
   */
  async updateMyAvatar(req, res, next) {
    try {
      const userId = req.user.id;
      if (!req.file) {
        return ResponseHelper.error(res, "KhÃ´ng tÃ¬m tháº¥y file áº£nh");
      }

      // Táº£i lÃªn Cloudinary báº±ng stream vÃ¬ dÃ¹ng memoryStorage
      const uploadPromise = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "crm_avatars" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      const result = await uploadPromise;
      const avatar_url = result.secure_url;

      // Cáº­p nháº­t URL vÃ o Database
      const user = await UserService.updateUser(userId, { avatar_url });
      
      return ResponseHelper.success(res, { avatar_url }, "Cáº­p nháº­t Avatar thÃ nh cÃ´ng");
    } catch (error) {
      next(error);
    }
  }
};

module.exports = UserController;

