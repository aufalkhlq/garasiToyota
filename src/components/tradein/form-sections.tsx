type Errors = Record<string, string>;

export function DataDiriSection({ errors }: { errors: Errors }) {
  return (
    <fieldset>
      <legend className="text-lg font-semibold mb-4">Data Diri Anda</legend>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="customerName"
            required
            className="input-field"
            placeholder="Contoh: Budi Santoso"
          />
          {errors.customerName && (
            <p className="mt-1 text-xs text-red-600">{errors.customerName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Nomor Telepon <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="customerPhone"
            required
            className="input-field"
            placeholder="08xxxxxxxxxx"
          />
          {errors.customerPhone && (
            <p className="mt-1 text-xs text-red-600">{errors.customerPhone}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <input
            type="email"
            name="customerEmail"
            className="input-field"
            placeholder="nama@email.com"
          />
          {errors.customerEmail && (
            <p className="mt-1 text-xs text-red-600">{errors.customerEmail}</p>
          )}
        </div>
      </div>
    </fieldset>
  );
}

export function DataMobilLamaSection({ errors }: { errors: Errors }) {
  return (
    <fieldset>
      <legend className="text-lg font-semibold mb-4">
        Data Mobil Lama (Trade In)
      </legend>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Merk <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="oldCarBrand"
            required
            className="input-field"
            placeholder="Contoh: Toyota"
          />
          {errors.oldCarBrand && (
            <p className="mt-1 text-xs text-red-600">{errors.oldCarBrand}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Model <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="oldCarModel"
            required
            className="input-field"
            placeholder="Contoh: Avanza"
          />
          {errors.oldCarModel && (
            <p className="mt-1 text-xs text-red-600">{errors.oldCarModel}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Tahun <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="oldCarYear"
            required
            min={1990}
            max={2030}
            className="input-field"
            placeholder="2020"
          />
          {errors.oldCarYear && (
            <p className="mt-1 text-xs text-red-600">{errors.oldCarYear}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Kilometer <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="oldCarKm"
            required
            min={0}
            className="input-field"
            placeholder="50000"
          />
          {errors.oldCarKm && (
            <p className="mt-1 text-xs text-red-600">{errors.oldCarKm}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1.5">
            Kondisi <span className="text-red-500">*</span>
          </label>
          <select
            name="oldCarCondition"
            required
            className="input-field"
            defaultValue=""
          >
            <option value="" disabled>
              Pilih kondisi
            </option>
            <option value="Sangat Baik">Sangat Baik (Seperti Baru)</option>
            <option value="Baik">Baik</option>
            <option value="Cukup Baik">Cukup Baik</option>
            <option value="Perlu Perbaikan">Perlu Perbaikan</option>
          </select>
          {errors.oldCarCondition && (
            <p className="mt-1 text-xs text-red-600">
              {errors.oldCarCondition}
            </p>
          )}
        </div>
      </div>
    </fieldset>
  );
}
